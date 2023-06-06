package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Activite;

import java.util.List;
public interface ActiviteMapper {
    List<Activite> getActivite(int appID, int typeID);
}
