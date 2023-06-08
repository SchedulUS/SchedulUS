package ca.usherbrooke.gegi.server.assignation.models;

import ca.usherbrooke.gegi.server.assignation.algorithm.WeightCalculator;

public class PersonWithWeights
{
    private final String cip;
    private final float poidsAM;
    private final float poidsPM;
    private final float poidsIntendance;
    private PreferenceEnum intendanceFor;
    public PersonWithWeights(String cip, PreferenceEnum preference, float ratioIntendence,boolean wantsToBeAttendent)
    {
        this.cip = cip;

        if (wantsToBeAttendent)
        {
            this.poidsIntendance = WeightCalculator.GetIntendenceWeight(ratioIntendence);
        }
        else
        {
            this.poidsIntendance = 0;
        }
        this.poidsAM = WeightCalculator.GetAMWeight(preference);
        this.poidsPM = WeightCalculator.GetPMWeight(preference);
        this.intendanceFor = preference;
    }
    public String getCIP()
    {
        return cip;
    }
    public float getPoidsAM()
    {
        return poidsAM;
    }
    public float getPoidsPM()
    {
        return poidsPM;
    }
    public float getPoidsIntendance()
    {
        return poidsIntendance;
    }
    public PreferenceEnum getIntendanceFor()
    {
        return intendanceFor;
    }
    public boolean getWantsToBeAttendent()
    {
        return poidsIntendance != 0;
    }
}
