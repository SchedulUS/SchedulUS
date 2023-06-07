package ca.usherbrooke.gegi.server.assignation.models;

public class PersonInActivity
{
    private String cip;
    private boolean isAttendent;
    public PersonInActivity(String cip, boolean isAttendent)
    {
        this.cip = cip;
        this.isAttendent = isAttendent;
    }
    public String getCIP()
    {
        return cip;
    }
    public boolean getIsAttendent()
    {
        return isAttendent;
    }
}
