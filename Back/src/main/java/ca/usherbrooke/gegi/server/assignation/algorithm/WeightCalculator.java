package ca.usherbrooke.gegi.server.assignation.algorithm;

import ca.usherbrooke.gegi.server.assignation.models.PreferenceEnum;
import java.lang.Math;

public class WeightCalculator
{
    static final float minimum = 0.5F;
    static final float maximum = 1.2F;

    public static float GetAMWeight(PreferenceEnum preference)
    {
        return switch (preference)
        {
            case AM -> maximum;
            case PM -> minimum;
        };
    }
    public static float GetPMWeight(PreferenceEnum preference)
    {
        return switch (preference)
        {
            case AM -> minimum;
            case PM -> maximum;
        };
    }
    public static float GetIntendenceWeight(float ratioIntendence)
    {
        //https://www.desmos.com/calculator/tyoytlaeha
        return (float) (Math.exp(-3*ratioIntendence) + 0.2);
    }
}
