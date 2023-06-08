package ca.usherbrooke.gegi.server.service;

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

    @GET
    @Path("getPreferencePoids/{appID}/{typeID}")
    public List<PreferencePoids> getPreferencePoid(@PathParam("appID") int appID,@PathParam("typeID") int typeID){
        String cip = this.securityContext.getUserPrincipal().getName();
        List<Poids> poids = activiteMapper.getPoids(appID);
        List<EtudiantPreference> etudiantPreferences = activiteMapper.getEtudiantPreference(appID);
        List<Preference> preferences = activiteMapper.getPreference();
        List<Activite> activites = activiteMapper.getActivite(appID,typeID,cip);
        return getPreferencePoids(poids,etudiantPreferences,preferences);
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
