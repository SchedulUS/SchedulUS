package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.ChangementActivite;
import ca.usherbrooke.gegi.server.business.EtudiantEchange;
import ca.usherbrooke.gegi.server.business.Groupe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChangementActiviteMapper
{
    List<ChangementActivite> getChangementActivite(@Param("cip") String cip);

    List<Groupe> getEtudiantIntendant(@Param("cip") String cip);
    List<Groupe> getActiviteIntendant(@Param("cip") String cip, @Param("appID") int appID);

    void setChangementActivite(@Param("activiteID") int activiteID, @Param("cip") String cip);

    void updateChangementActivite(@Param("activiteID") int activiteID, @Param("cip") String cip);

    void deleteChangmentActivite(@Param("cip") String cip);

    Boolean VerifierNbChangement(@Param("cip") String cip);

    Integer DiminuerNbChangement(@Param("cip") String cip);

    EtudiantEchange getEtudiantVoulantChanger(@Param("cip") String cip, @Param("activiteId") int activiteId);
    void supprimerDemandeChangement(@Param("cip") String cip, @Param("activiteId") int activiteId);
    void changerGroupe(@Param("cip") String cip, @Param("oldActiviteId") int oldActiviteId, @Param("newActiviteId") int newActivite);
    Integer getCurrentGroupOfStudent(@Param("cip") String cip, @Param("activite_id") int activiteId);
    Boolean getIsContainingGhostStudent(@Param("activite_id") int activiteId);
    Boolean getUsagerIntendant(@Param("cip") String cip, @Param("activite_id") int activiteId);
}