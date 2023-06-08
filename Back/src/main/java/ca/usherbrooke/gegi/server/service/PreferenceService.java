package ca.usherbrooke.gegi.server.service;

import ca.usherbrooke.gegi.server.business.Preference;
import ca.usherbrooke.gegi.server.business.PreferenceAPP;
import ca.usherbrooke.gegi.server.business.PreferenceIntendance;
import ca.usherbrooke.gegi.server.persistence.PreferenceMapper;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;




@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PreferenceService
{
	@Context
	SecurityContext securityContext;

	@Inject
	PreferenceMapper preferenceMapper;

	@GET 
	@Path("getPreferences")
	public List<Preference> getPreferences()
	{
		return preferenceMapper.getPreferences();
	}

	@GET
	@Path("getPreferenceIntendance/{idAPP}")
	public boolean getPreferenceIntendance(@PathParam("idAPP") int idAPP)
	{
		return preferenceMapper.getPreferenceIntendance(this.securityContext.getUserPrincipal().getName(), idAPP);
	}

	@POST
	@Path("/setPreferenceIntendance")
	public Integer setPreferenceIntendance(@RequestBody PreferenceIntendance preferenceIntendant)
	{
		preferenceMapper.setPreferenceIntendance(this.securityContext.getUserPrincipal().getName(), preferenceIntendant.idAPP, preferenceIntendant.intendance);
		return 1;
	}

	@GET
	@Path("getPreferenceUsager")
	public Integer getPreferenceUsager()
	{
		return preferenceMapper.getPreferenceUsager(this.securityContext.getUserPrincipal().getName());
	}

	@GET
	@Path("getPreferenceUsagerApp/{appId}")
	public boolean getPreferenceAppUsager(@PathParam("appId") int appId){
		return preferenceMapper.getPreferenceIntendance(this.securityContext.getUserPrincipal().getName(), appId);
	}
	@POST
	@Path("/setPreferenceUsagerAPP")
	public void setPreferenceUsagerAPP(@RequestBody PreferenceAPP preference)
	{
		String cip = this.securityContext.getUserPrincipal().getName();
		preferenceMapper.setPreferenceUsagerAPP(cip,preference.appId,preference.preference_id,preference.intendant);
	}
	@GET
	@Path("/getPreferenceUsagerAPP/{appId}")
	public int getPreferenceUsagerAPP(@PathParam("appId") int appId)
	{
		String cip = this.securityContext.getUserPrincipal().getName();
		return preferenceMapper.getPreferenceUsagerAPP(cip,appId);
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
