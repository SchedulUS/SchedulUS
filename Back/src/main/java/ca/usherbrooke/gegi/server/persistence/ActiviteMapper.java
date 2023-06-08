package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Activite;
import ca.usherbrooke.gegi.server.business.EtudiantPreference;
import ca.usherbrooke.gegi.server.business.Poids;
import ca.usherbrooke.gegi.server.business.Preference;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import javax.ws.rs.PathParam;
import java.util.List;
@Mapper
public interface ActiviteMapper {
    List<Activite> getActivite(@PathParam("appID") int appID,@PathParam("typeID") int typeID, String cip);
    List<Poids> getPoids(int appID);
    List<EtudiantPreference> getEtudiantPreference(int appID);
    List<Preference> getPreference();
}
