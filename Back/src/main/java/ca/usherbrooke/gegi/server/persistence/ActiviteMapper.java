package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Activite;
import ca.usherbrooke.gegi.server.business.EtudiantPreference;
import ca.usherbrooke.gegi.server.business.Poids;
import ca.usherbrooke.gegi.server.business.Preference;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import javax.ws.rs.PathParam;
import java.util.List;
@Mapper
public interface ActiviteMapper {
    List<Activite> getActivites(String cip);
    @Select("SELECT activite.activite_id as activiteId, activite.local, activite.nom as activiteNom,lower(activite.periode) as debut, upper(activite.periode) as fin, app.app_id as appId, app.nom as appNom, app.cours as appCours, type_activite.type_id as typeId, type_activite.nom as typeNom FROM activite\n" +
            "INNER JOIN type_activite ON type_activite.type_id = activite.type_id\n" +
            "INNER JOIN app ON app.app_id = activite.app_id\n" +
            "INNER JOIN app_usager ON app_usager.app_id = activite.app_id\n" +
            "WHERE app.app_id = #{appID} AND type_activite.type_id = #{typeID} AND app_usager.cip = #{cip}\n" +
            "ORDER BY activiteNom,activite.periode ASC;")
    List<Activite> findById(long appID,long typeID, String cip);
    Activite getActiviteUsager(@Param("appId") int appId, @Param("typeId") int typeId, @Param("cip") String cip);
    List<Activite> getActivite(@Param("appID") int appID, @Param("typeID") int typeID, @Param("cip") String cip);
    List<Poids> getPoids(@Param("appID") int appID);
    List<EtudiantPreference> getEtudiantPreference(@Param("appID") int appID);
    List<Preference> getPreference();
    List<Activite> getNomActivite(@Param("cip") String cip);
}
