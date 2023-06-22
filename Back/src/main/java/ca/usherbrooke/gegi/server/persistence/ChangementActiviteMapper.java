package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.ChangementActivite;
import ca.usherbrooke.gegi.server.business.Groupe;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.eclipse.microprofile.openapi.models.parameters.Parameter;

import java.util.List;

@Mapper
public interface ChangementActiviteMapper {
    List<ChangementActivite> getChangementActivite(@Param("cip") String cip);

    List<Groupe> getEtudiantIntendant(@Param("cip") String cip);

    void setChangementActivite(@Param("activiteID") int activiteID, @Param("cip") String cip);

    void updateChangementActivite(@Param("activiteID") int activiteID, @Param("cip") String cip);

    void deleteChangmentActivite(@Param("cip") String cip);

}
