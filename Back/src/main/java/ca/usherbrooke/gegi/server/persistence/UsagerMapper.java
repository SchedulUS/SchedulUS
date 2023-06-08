package ca.usherbrooke.gegi.server.persistence;

import ca.usherbrooke.gegi.server.business.Person;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UsagerMapper
{
    Person getNbrEchange(String cip);
    void setPreference(@Param("cip") String cip, @Param("preferenceId") int preferenceId);
/*
    List<Message> select(String trimesterId, String profileId, String unit, Integer id);
    Message selectOne(Integer id);
    void deleteOne(Integer id);
    List<Message> allMessages();
    void insertMessage(@Param("message") Message message);
    Integer getNewId();
*/
}
