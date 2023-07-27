package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.Person;
import ca.usherbrooke.gegi.server.business.Preference;
import ca.usherbrooke.gegi.server.persistence.UsagerMapper;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.jsoup.parser.Parser;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.List;
import java.util.stream.Collectors;




@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsagerService
{
	@Context
	SecurityContext securityContext;

	@Inject
	UsagerMapper usagerMapper;

	@GET 
	@Path("getNbrEchange")
	public Person getNbrEchange()
	{
		return usagerMapper.getNbrEchange(this.securityContext.getUserPrincipal().getName());
	}

	@POST
	@Path("/setPreference")
	public Integer setPreference(@RequestBody Preference preference)
	{
		usagerMapper.setPreference(this.securityContext.getUserPrincipal().getName(), preference.preferenceId);
		return 1;
	}
}
