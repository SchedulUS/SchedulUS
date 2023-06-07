package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.Activite;
import ca.usherbrooke.gegi.server.business.Preference;
import ca.usherbrooke.gegi.server.persistence.ActiviteMapper;
import ca.usherbrooke.gegi.server.persistence.PreferenceMapper;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;


@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ActiviteService {

    @Inject
    ActiviteMapper ActiviteMapper;

    @GET
    @Path("getActivite")
    public List<Activite> getActivite(){
        return ActiviteMapper.getActivite();
    }

}
