package ca.usherbrooke.gegi.server.business;

import ca.usherbrooke.gegi.server.assignation.models.PreferenceEnum;

import java.util.List;

public class Preference {
    public int preferenceId;
    public String nom;
    public String debut;
    public String fin;

    public String toString() {
        return nom;
    }
    public static PreferenceEnum getPreferenceEnum(String debut)
    {
        String[] hourSeperated = debut.split(":");
        if (hourSeperated.length < 1) return PreferenceEnum.AM;
        int hour = 8;
        try {
            hour =  Integer.parseInt(hourSeperated[0]);
        } catch (NumberFormatException e) {
            return PreferenceEnum.AM;
        }
        if (hour < 12) return PreferenceEnum.AM;
        return PreferenceEnum.PM;
    }
}