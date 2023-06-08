package ca.usherbrooke.gegi.server.assignation.models;

public class PersonWithRange
{
    private final String cip;
    private float start;
    private float end;
    public PersonWithRange(String cip, float start, float end)
    {
        this.cip = cip;
        this.start = start;
        this.end = end;
    }
    public boolean isInside(float value)
    {
        return value >= start && value < end;
    }
    public void moveRange(float startOfRemovedPerson, float rangeRemoved)
    {
        if (end <= startOfRemovedPerson)
        {
            return;
        }
        start -= rangeRemoved;
        end -= rangeRemoved;
    }
    public String getCIP()
    {
        return cip;
    }
    public float getRange()
    {
        return end - start;
    }
    public float getEnd()
    {
        return end;
    }
    public float getStart()
    {
        return start;
    }
}
