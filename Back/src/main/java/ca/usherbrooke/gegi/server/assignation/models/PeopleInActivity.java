package ca.usherbrooke.gegi.server.assignation.models;

import java.util.ArrayList;
import java.util.List;

public class PeopleInActivity
{
    private final int activityId;
    private final PreferenceEnum zone;
    private final List<PersonInActivity> peopleInActivity;
    private int nombreDeCIPMax;
    public PeopleInActivity(int activityId, PreferenceEnum zone)
    {
        this.activityId = activityId;
        this.zone = zone;
        nombreDeCIPMax = 0;
        peopleInActivity = new ArrayList<>(nombreDeCIPMax);
    }
    public boolean isFull()
    {
        return nombreDeCIPMax <= peopleInActivity.size();
    }
    public void addPerson(PersonWithRange person, boolean isAttendent)
    {
        if (isFull() && !isAttendent) return;

        peopleInActivity.add(new PersonInActivity(person.getCIP(),isAttendent));
    }
    public PreferenceEnum getZone()
    {
        return zone;
    }
    public int getActivityId()
    {
        return activityId;
    }
    public List<PersonInActivity> getPeople()
    {
        return peopleInActivity;
    }
    public void setNombreDeCIPMax(int nombreDeCIPMax)
    {
        if (nombreDeCIPMax < this.nombreDeCIPMax) return;
        this.nombreDeCIPMax = nombreDeCIPMax;
    }
    public int getNombreDeCIPMax()
    {
        return nombreDeCIPMax;
    }
    public boolean isEmpty() {return peopleInActivity.isEmpty();}
}
