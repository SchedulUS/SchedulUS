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
	public Boolean getPreferenceIntendance(@PathParam("idAPP") int idAPP)
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
	public Boolean getPreferenceAppUsager(@PathParam("appId") int appId){
		return preferenceMapper.getPreferenceIntendance(this.securityContext.getUserPrincipal().getName(), appId);
	}
	@POST
	@Path("/setPreferenceUsagerAPP")
	public void setPreferenceUsagerAPP(@RequestBody PreferenceAPP preference)
	{
		String cip = this.securityContext.getUserPrincipal().getName();
		Boolean intendant = preferenceMapper.getRowExistPreferenceUsagerAPP(cip,preference.appId);
		if(intendant){
			preferenceMapper.updateIntendant(cip,preference.appId,preference.preference_id,preference.intendant);
		}else{
			preferenceMapper.setPreferenceUsagerAPP(cip,preference.appId,preference.preference_id,preference.intendant);
		}
	}
	@GET
	@Path("/getPreferenceUsagerAPP/{appId}")
	public Integer getPreferenceUsagerAPP(@PathParam("appId") int appId)
	{
		String cip = this.securityContext.getUserPrincipal().getName();
		return preferenceMapper.getPreferenceUsagerAPP(cip,appId);
	}
}
