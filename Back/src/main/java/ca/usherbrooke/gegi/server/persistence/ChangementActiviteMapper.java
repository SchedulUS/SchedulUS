package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.EtudiantEchange;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ChangementActiviteMapper
{
    EtudiantEchange getEtudiantVoulantChanger(@Param("cip") String cip, @Param("activiteId") int activiteId);
    void supprimerDemandeChangement(@Param("cip") String cip, @Param("activiteId") int activiteId);
    void changerGroupe(@Param("cip") String cip, @Param("oldActiviteId") int oldActiviteId, @Param("newActiviteId") int newActivite);
    Integer getCurrentGroupOfStudent(@Param("cip") String cip, @Param("activite_id") int activiteId);
}
