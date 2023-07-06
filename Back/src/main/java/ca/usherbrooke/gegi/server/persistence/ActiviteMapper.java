package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import javax.ws.rs.PathParam;
import java.util.List;
@Mapper
public interface ActiviteMapper
{
    List<Activite> getActivites(String cip);
    List<Activite> getActivite(@Param("appID") int appID, @Param("typeID") int typeID, @Param("cip") String cip);
    Activite getActiviteByID(@Param("activiteID") Integer activiteID);
    TypeActivite getAutreTypeActicite(@Param("typeActiviteID") Integer typeActiviteID);
    Activite getAutreActivite(@Param("nomGroupe") String nomGroupe, @Param("appID") Integer appID, @Param("typeActiviteID") Integer typeActiviteID);
    List<Activite> getActiviteUsager(@Param("appID") int appID, @Param("typeID") int typeID, @Param("cip") String cip);
    List<Poids> getPoids(@Param("appID") int appID);
    List<EtudiantPreference> getEtudiantPreference(@Param("appID") int appID);
    List<EtudiantPreference> getUsager(@Param("appID") int appID);
    List<Preference> getPreference();
    List<Activite> getNomActivite(@Param("cip") String cip);
    Boolean getInscription(@Param("idAPP") int idAPP);

    void setGroupe(@Param("cip") String cip,
                                      @Param("activiteId") Integer activiteId,
                                      @Param("intendant") Boolean intendant);
    void setInscription(@Param("inscription") Boolean inscription,@Param ("appID") Integer appID);

}

