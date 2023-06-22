package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.assignation.algorithm.ActivitiesAssigner;
import ca.usherbrooke.gegi.server.assignation.models.PeopleInActivity;
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
import java.util.List;
import java.util.Objects;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"etudiant"})
public class ChangementActiviteService {
    @Context
    SecurityContext securityContext;
    @Inject
    ActiviteMapper activiteMapper;

    
}
