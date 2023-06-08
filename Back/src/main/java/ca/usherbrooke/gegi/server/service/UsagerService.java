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
public class UsagerService {
	@Context
	SecurityContext securityContext;

	@Inject
	UsagerMapper usagerMapper;

	@GET 
	@Path("getNbrEchange")
	public Person getNbrEchange(){
		return usagerMapper.getNbrEchange(this.securityContext.getUserPrincipal().getName());
	}

	@POST
	@Path("/setPreference")
	public Integer setPreference(@RequestBody Preference preference){
		usagerMapper.setPreference(this.securityContext.getUserPrincipal().getName(), preference.preferenceId);
		return 1;
	}

/*
	@GET
	@Path("getmessages/{trimester}/{profile}/{unit}")

	public List<Message> getMessages(
			@PathParam("trimester") String trimesterId,
			@PathParam("profile") String profileId,
			@PathParam("unit") String unit
	) {
		List<Message> messages = messageMapper.select(trimesterId, profileId, unit, null);
		return messages;
	}


	@GET
	@Path("getallmessages")
	public List<Message> getAllMessages(
	) {
		List<Message> messages = messageMapper.allMessages();
		return this.unescapeEntities(messages);
	}

	@GET
	@Path("getmessage/{id}")
	public Message getMessage(
			@PathParam("id") Integer id
	) {
		Message message = messageMapper.selectOne(id);
		return unescapeEntities(message);
	}

	@DELETE
	@Path("deletemessage/{id}")
	public void deleteMessage(
			@PathParam("id") Integer id
	) {
		messageMapper.deleteOne(id);
		return;
	}


	@PUT
	@Path("putmessage")
	//@RolesAllowed({Roles.TEACHER})
	public void insertMessage(Message message) {
		messageMapper.insertMessage(message);
	}

	@GET
	@Path("getnewid")
	//@RolesAllowed({Roles.TEACHER})
	public Integer getnewid() {
		Integer id = messageMapper.getNewId();
		return id;
	}

	public static Message unescapeEntities(Message message) {
		message.description = Parser.unescapeEntities(message.description, true);
		return message;
	}

	public List<Message> unescapeEntities(List<Message> messages) {
		return messages
				.stream()
				.map(MessageService::unescapeEntities)
				.collect(Collectors.toList());
	}
*/
}
