package ca.usherbrooke.gegi.server.assignation.algorithm;

import ca.usherbrooke.gegi.server.assignation.converters.WeightsToRangeConverter;
import ca.usherbrooke.gegi.server.assignation.models.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;

public class ActivitiesAssigner
{
    private final List<PeopleInActivity> activities;
    private final List<PersonWithWeights> people;
    private List<PersonWithRange> rangesAM;
    private List<PersonWithRange> rangesPM;

    public ActivitiesAssigner(List<PeopleInActivity> activitiesToFill, List<PersonWithWeights> people)
    {
        this.activities = activitiesToFill;
        this.people = people;
        calculatePlacesInEachActivity();
        calculateRangesForStudents();
    }
    private void calculateRangesForStudents()
    {
        rangesAM = new ArrayList<>(people.size());
        rangesPM = new ArrayList<>(people.size());
        float startAM = 0;
        float startPM = 0;
        for (PersonWithWeights person:
             people) {
            PersonWithRange personWithRangeAM = WeightsToRangeConverter.DefineRange(RandomCasesEnum.AM,person,startAM);
            PersonWithRange personWithRangePM = WeightsToRangeConverter.DefineRange(RandomCasesEnum.PM,person,startPM);
            startAM = personWithRangeAM.getEnd();
            startPM = personWithRangePM.getEnd();
            rangesAM.add(personWithRangeAM);
            rangesPM.add(personWithRangePM);
        }
    }
    private void calculatePlacesInEachActivity()
    {
        int numberOfPeople = people.size();
        int minimumByActivities = numberOfPeople / activities.size();
        int peopleLeft = numberOfPeople - minimumByActivities * activities.size();

        for (PeopleInActivity activity: activities) {
            int nombreDeCIP = minimumByActivities;

            if (peopleLeft > 0)
            {
                nombreDeCIP++;
                peopleLeft--;
            }

            activity.setNombreDeCIPMax(nombreDeCIP);
        }
    }
    public List<PeopleInActivity> getActivities()
    {
        return activities;
    }
    private float getRandomValue(float min,float max)
    {
        Random rd = new Random();
        return min + rd.nextFloat() * (max - min);
    }
    private float getEndOfRanges(List<PersonWithRange> peopleRange)
    {
        return peopleRange.get(peopleRange.size()-1).getEnd();
    }
    private PersonWithRange getRandomPerson(List<PersonWithRange> peopleRange)
    {
        if (peopleRange.size() == 0) return null;

        float max = getEndOfRanges(peopleRange);
        float valueToFind = getRandomValue(0,max);

        for (PersonWithRange person:
                peopleRange) {
            if (person.isInside(valueToFind)) return person;
        }

        return peopleRange.get(0);
    }
    private List<PersonWithRange> getPeopleIntendents(PreferenceEnum zone)
    {
        List<PersonWithRange> peopleToCheck = new ArrayList<>();
        float start = 0;
        for (PersonWithWeights person:
                people) {
            if (person.getWantsToBeAttendent() && person.getIntendanceFor() == zone)
            {
                PersonWithRange personWithRange = WeightsToRangeConverter.DefineRange(RandomCasesEnum.Intendence,person,start);
                peopleToCheck.add(personWithRange);
                start = personWithRange.getEnd();
            }
        }
        return peopleToCheck;
    }
    private void placeIntendents(PreferenceEnum zone, boolean placeAleatoireSiAucun)
    {
        List<PeopleInActivity> activitiesInZone = getActivitiesForAZone(zone);
        List<PersonWithRange> peopleWhoWantsToBeIntendentCheck = getPeopleIntendents(zone);

        for (PeopleInActivity activity:
             activitiesInZone)
        {
            if (!activity.isEmpty()){
                continue;
            }
            PersonWithRange person;
            //Place people who wants to be intendent
            if (!peopleWhoWantsToBeIntendentCheck.isEmpty())
            {
                person = getRandomPerson(peopleWhoWantsToBeIntendentCheck);
                removePersonFromList(person,peopleWhoWantsToBeIntendentCheck);
            }
            else{
                //Place people who doesn't want to be intendent
                if (placeAleatoireSiAucun)
                {
                    person = getRandomPerson(getRangeByZone(zone));
                    if (person == null) continue;
                }
                else{
                    continue;
                }
            }
            removePersonFromList(person,rangesAM);
            removePersonFromList(person,rangesPM);
            activity.addPerson(person,true);
        }
    }
    private List<PersonWithRange> getRangeByZone(PreferenceEnum zone)
    {
        return switch (zone)
        {
            case AM -> rangesAM;
            case PM -> rangesPM;
        };
    }
    public void createGroupsForActivities()
    {
        placeIntendents(PreferenceEnum.AM,false);
        placeIntendents(PreferenceEnum.PM,false);
        placeIntendents(PreferenceEnum.AM,true);
        placeIntendents(PreferenceEnum.PM,true);

        for (PeopleInActivity activty:
             activities) {
            while (!activty.isFull())
            {
                PersonWithRange person = getRandomPerson(getRangeByZone(activty.getZone()));
                if (person == null) break;
                activty.addPerson(person,false);
                removePersonFromList(person,rangesAM);
                removePersonFromList(person,rangesPM);
            }
        }
    }
    private List<PeopleInActivity> getActivitiesForAZone(PreferenceEnum zone)
    {
        List<PeopleInActivity> activitiesThatMatches = new ArrayList<>();

        for (PeopleInActivity activity:
             activities) {
            if (activity.getZone() == zone) activitiesThatMatches.add(activity);
        }

        return activitiesThatMatches;
    }
    private void removePersonFromList(PersonWithRange personToRemove, List<PersonWithRange> rangeList)
    {
        int initialSize = rangeList.size();
        PersonWithRange removedPerson = null;
        for (int i = 0; i < initialSize; i++) {
            if (rangeList.get(i).getCIP().equals(personToRemove.getCIP()))
            {
                removedPerson = rangeList.get(i);
                rangeList.remove(i);
                break;
            }
        }

        if (removedPerson == null) return;

        for (PersonWithRange person:
                rangeList) {
            person.moveRange(removedPerson.getStart(),removedPerson.getRange());
        }
    }
}
