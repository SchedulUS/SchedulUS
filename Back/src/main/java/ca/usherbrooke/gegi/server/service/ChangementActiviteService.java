package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.ChangementActivite;
import ca.usherbrooke.gegi.server.business.Groupe;
import ca.usherbrooke.gegi.server.business.EtudiantEchange;
import ca.usherbrooke.gegi.server.persistence.ChangementActiviteMapper;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.models.parameters.Parameter;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"etudiant"})
public class ChangementActiviteService
{
    @Context
    SecurityContext securityContext;
    @Inject
    ChangementActiviteMapper changementActiviteMapper;
    private void ChangementAvecFantome(String cip, int activiteId)
    {
        Integer oldActiviteId = changementActiviteMapper.getCurrentGroupOfStudent(cip,activiteId);
        changementActiviteMapper.changerGroupe(cip,oldActiviteId,activiteId);
    }
    private void ChangementAvecEtudiant(String cip, int activiteId, EtudiantEchange autreEtudiant)
    {
        changementActiviteMapper.supprimerDemandeChangement(autreEtudiant.cip,autreEtudiant.activiteVoulueId);
        changementActiviteMapper.changerGroupe(cip,autreEtudiant.activiteVoulueId,activiteId);
        changementActiviteMapper.changerGroupe(autreEtudiant.cip,activiteId,autreEtudiant.activiteVoulueId);
    }
    private void EffectuerChangement(String cip, int activiteId)
    {
        EtudiantEchange autreEtudiantAEchanger = changementActiviteMapper.getEtudiantVoulantChanger(cip,activiteId);

        //Si null c'est un changement avec un étudiant fantôme
        if (autreEtudiantAEchanger == null)
        {
            ChangementAvecFantome(cip,activiteId);
        }
        else
        {
            ChangementAvecEtudiant(cip,activiteId,autreEtudiantAEchanger);
        }
    }
    
    @GET
    @Path("getChangementActivite")
    public List<ChangementActivite> getChangementActivite(){
        String cip = this.securityContext.getUserPrincipal().getName();
        return changementActiviteMapper.getChangementActivite(cip);
    }

    @GET
    @Path("getEtudiantIntendant")
    public List<Groupe> getEtudiantIntendant(){
        String cip = this.securityContext.getUserPrincipal().getName();
        return changementActiviteMapper.getEtudiantIntendant(cip);
    }

    @PUT
    @Path("updateChangementActivite")
    public Integer updateChangementActivite(@RequestBody ChangementActivite changementActivite){
        String cip = this.securityContext.getUserPrincipal().getName();
        List<Groupe> intendants = getEtudiantIntendant();
        if(intendants.isEmpty()) {
            try{
                changementActiviteMapper.updateChangementActivite(changementActivite.activiteID, cip);
                return 1;
            }
            catch (Exception ex){
                return -1;
            }
        }
        return 1;
    }

    @POST
    @Path("setChangementActivite")
    public Integer setChangementActivite(@RequestBody ChangementActivite changementActivite){
        String cip = this.securityContext.getUserPrincipal().getName();
        List<Groupe> intendants = getEtudiantIntendant();
        if(intendants.isEmpty()){
            List<ChangementActivite> changementActivites = getChangementActivite();
            if(changementActivites.isEmpty()){
                changementActiviteMapper.setChangementActivite(changementActivite.activiteID,cip);
                return 1;
            }
            else{
                updateChangementActivite(changementActivite);
                return 1;
            }
        }
        return 0;
    }

    @DELETE
    @Path("deleteChangmentActivite")
    public void deleteChangmentActivite(){
        String cip = this.securityContext.getUserPrincipal().getName();
        changementActiviteMapper.deleteChangmentActivite(cip);
    }

}
