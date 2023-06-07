package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Activite;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface ActiviteMapper {
    List<Activite> getActivite(@Param("appID") int appID, @Param("typeID") int typeID, String cip);
}
