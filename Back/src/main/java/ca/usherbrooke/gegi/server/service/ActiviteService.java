package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.Activite;
import ca.usherbrooke.gegi.server.persistence.ActiviteMapper;

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
public class ActiviteService {
    @Context
    SecurityContext securityContext;
    @Inject
    ActiviteMapper activiteMapper;

    @GET
    @Path("getActivite/{appID}/{typeID}")
    public List<Activite> getActivite(@PathParam("appID") int appID,@PathParam("typeID") int typeID){
        return activiteMapper.getActivite(appID,typeID, this.securityContext.getUserPrincipal().getName());
    }
}
