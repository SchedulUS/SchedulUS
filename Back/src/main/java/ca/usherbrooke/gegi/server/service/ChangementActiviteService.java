package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.EtudiantEchange;
import ca.usherbrooke.gegi.server.persistence.ChangementActiviteMapper;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"etudiant"})
public class ChangementActiviteService {
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
    @Path("testEffectuerChangement")
    public String testEffectuerChangement()
    {
        String cip = "stds2101";
        int activite = 11;
        EffectuerChangement(cip,activite);
        return "Regarde la bd";
    }
}
