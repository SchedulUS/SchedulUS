package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Preference;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PreferenceMapper
{
    List<Preference> getPreferences();
    Boolean getPreferenceIntendance(@Param("cip") String cip, @Param("idAPP") int idAPP);
    void setPreferenceIntendance(@Param("cip") String cip, @Param("idAPP") int idAPP, @Param("intendance") boolean intendance);
    void setPreferenceUsagerAPP(@Param("cip") String cip, @Param("appId") int appId,@Param("preferenceId") int preferenceId, @Param("intendant") boolean intendant);
    Integer getPreferenceUsager(String cip);
    Integer getPreferenceUsagerAPP(@Param("cip") String cip, @Param("appId") int appId);
    Boolean getRowExistPreferenceUsagerAPP(@Param("cip") String cip, @Param("appId") int appId);
    void updateIntendant(@Param("cip") String cip, @Param("appId") int appId,@Param("preferenceId") int preferenceId, @Param("intendant") boolean intendant);
}
