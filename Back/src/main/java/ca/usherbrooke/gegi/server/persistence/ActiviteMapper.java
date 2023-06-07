package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Activite;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ActiviteMapper {
    List<Activite> getActivite();
}
