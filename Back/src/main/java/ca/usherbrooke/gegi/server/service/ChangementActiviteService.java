package ca.usherbrooke.gegi.server.service;

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


}
