package ca.usherbrooke.gegi.server.service;
import javax.ws.rs.core.Response;
import ca.usherbrooke.gegi.server.assignation.algorithm.ActivitiesAssigner;
import ca.usherbrooke.gegi.server.assignation.models.PeopleInActivity;
import ca.usherbrooke.gegi.server.assignation.models.PersonInActivity;
import ca.usherbrooke.gegi.server.assignation.models.PersonWithWeights;
import ca.usherbrooke.gegi.server.assignation.models.PreferenceEnum;
import ca.usherbrooke.gegi.server.business.*;
import ca.usherbrooke.gegi.server.persistence.ActiviteMapper;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"etudiant"})
public class ActiviteService
{
    @Context
    SecurityContext securityContext;
    @Inject
    ActiviteMapper activiteMapper;

    @GET
    @Path("getActivite/{appID}/{typeID}")
    public List<Activite> getActivite(@PathParam("appID") int appID,@PathParam("typeID") int typeID){
        String cip = this.securityContext.getUserPrincipal().getName();
        return activiteMapper.getActivite(appID,typeID, cip);
    }

    @GET
    @Path("getActiviteUsager/{appID}/{typeID}")
    public List<Activite> getActiviteUsager(@PathParam("appID") int appID,@PathParam("typeID") int typeID){
        String cip = this.securityContext.getUserPrincipal().getName();
        return activiteMapper.getActiviteUsager(appID,typeID, cip);
    }

    @GET
    @Path("getActivites")
    public List<Activite> getActivites(){
        return activiteMapper.getActivites(this.securityContext.getUserPrincipal().getName());
    }
    @GET
    @Path("getNomActivite")
    public List<Activite> getNomActivites(){
        return activiteMapper.getNomActivite(this.securityContext.getUserPrincipal().getName());
    }

    @POST
    @Path("postStatistiqueIntendant")
    public Activite postStatistiqueIntendant(@RequestBody Activite bob){
        return bob;
    }

    @GET
    @Path("getPoids/{appID}/")
    public List<Poids> getPoids(@PathParam("appID") int appID){
        return activiteMapper.getPoids(appID);
    }

    @GET
    @Path("getEtudiantPreference/{appID}/")
    public List<EtudiantPreference> getEtudiantPreference(@PathParam("appID") int appID){
        return activiteMapper.getEtudiantPreference(appID);
    }

    @GET
    @Path("getPreference/")
    public List<Preference> getPreference(){
        return activiteMapper.getPreference();
    }

    public List<PeopleInActivity> getPossibleGroupsForAnAPP(int appID,int typeID){
        String cip = this.securityContext.getUserPrincipal().getName();
        List<Poids> poids = activiteMapper.getPoids(appID);
        List<EtudiantPreference> etudiantPreferences = activiteMapper.getEtudiantPreference(appID);
        List<Preference> preferences = activiteMapper.getPreference();
        List<Activite> activites = activiteMapper.getActivite(appID,typeID,cip);
        List<PreferencePoids> preferencePoids = getPreferencePoids(poids,etudiantPreferences,preferences);
        //Using algorithm
        List<PeopleInActivity> activitiesToFill = new ArrayList<>(activites.size());
        for (Activite activite:
                activites) {
            activitiesToFill.add(new PeopleInActivity(activite.activiteId,Preference.getPreferenceEnum(activite.debut)));
        }
        List<PersonWithWeights> people = new ArrayList<>(preferencePoids.size());
        for (PreferencePoids person:
                preferencePoids) {
            PreferenceEnum preferenceEnum = getPreferenceByPersonPreferences(person.preferenceapp,person.preferenceglobal);

            if (person.intendant == null)
            {
                person.intendant = false;
            }

            people.add(new PersonWithWeights(person.cip,preferenceEnum, person.poids,person.intendant));
        }
        ActivitiesAssigner assigner = new ActivitiesAssigner(activitiesToFill,people);
        assigner.createGroupsForActivities();
        return assigner.getActivities();
    }
    @POST
    @Path("/groups/possible-groups")
    public Response getPossibleGroups(@RequestBody CreationGroupesDemande body) {
        List<PeopleInActivity> groups = getPossibleGroupsForAnAPP(body.appCourant, body.typeActiviteCourant);
        for (PeopleInActivity activity : groups) {
            int activiteId = activity.getActivityId();
            List<PersonInActivity> people = activity.getPeople();
            for (PersonInActivity person : people) {
                activiteMapper.setGroupe(person.getCIP(), activiteId, person.getIsAttendent());
            }
        }
        activiteMapper.setInscription( true, body.appCourant);
        return Response.ok(groups, MediaType.APPLICATION_JSON).build();
    }
    private PreferenceEnum getPreferenceByPersonPreferences(int appPreferenceId, int globalPreferenceId)
    {
        int preferenceId = appPreferenceId;
        if (appPreferenceId == 0)
        {
            preferenceId = globalPreferenceId;
        }
        if (preferenceId == 1) return PreferenceEnum.AM;
        else return PreferenceEnum.PM;
    }

    public List<PreferencePoids> getPreferencePoids(List<Poids> poids,List<EtudiantPreference> etudiantPreferences, List<Preference> preferences){
        List<PreferencePoids> preferencePoids = new ArrayList<>();
        poids.forEach(poidsElement ->{
            PreferencePoids preferencePoids1 = new PreferencePoids();
            etudiantPreferences.forEach(etudiantPreferenceElement -> {
                if(Objects.equals(poidsElement.cip, etudiantPreferenceElement.cip)) {
                    preferencePoids1.cip = poidsElement.cip;
                    preferencePoids1.poids = poidsElement.poids;
                    preferencePoids1.intendant = etudiantPreferenceElement.intendant;
                    preferencePoids1.preferenceapp = etudiantPreferenceElement.preferenceapp;
                    preferencePoids1.preferenceglobal = etudiantPreferenceElement.preferenceglobal;
                    preferences.forEach(preferenceElemet -> {
                        if (preferenceElemet.preferenceId == etudiantPreferenceElement.preferenceapp){
                            preferencePoids1.nomApp = preferenceElemet.nom;
                            preferencePoids1.debutApp = preferenceElemet.debut;
                            preferencePoids1.finApp = preferenceElemet.fin;
                        }
                    });
                    preferences.forEach(preferenceElemet -> {
                        if (preferenceElemet.preferenceId == etudiantPreferenceElement.preferenceglobal){
                            preferencePoids1.nomGlobal = preferenceElemet.nom;
                            preferencePoids1.debutGlobal = preferenceElemet.debut;
                            preferencePoids1.finGlobal = preferenceElemet.fin;
                        }
                    });
                    preferencePoids.add(preferencePoids1);
                }
            });
        });
        return  preferencePoids;
    }


}
