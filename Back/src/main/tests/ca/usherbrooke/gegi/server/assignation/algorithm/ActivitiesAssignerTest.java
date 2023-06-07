package ca.usherbrooke.gegi.server.assignation.algorithm;

import ca.usherbrooke.gegi.server.assignation.models.PeopleInActivity;
import ca.usherbrooke.gegi.server.assignation.models.PersonWithWeights;
import ca.usherbrooke.gegi.server.assignation.models.PreferenceEnum;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ActivitiesAssignerTest {
    @Test
    void TestAssignation()
    {
        PersonWithWeights p1 = new PersonWithWeights("AM-A", PreferenceEnum.AM,0,true);
        PersonWithWeights p2 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);
        PersonWithWeights p3 = new PersonWithWeights("AM-A", PreferenceEnum.AM,0,true);
        PersonWithWeights p4 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);
        PersonWithWeights p5 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);
        PersonWithWeights p6 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);
        PersonWithWeights p7 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);
        PersonWithWeights p8 = new PersonWithWeights("AM", PreferenceEnum.AM,0,false);

        PersonWithWeights p11 = new PersonWithWeights("PM-A", PreferenceEnum.PM,0,true);
        PersonWithWeights p12 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);
        PersonWithWeights p13 = new PersonWithWeights("PM-A", PreferenceEnum.PM,0,true);
        PersonWithWeights p14 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);
        PersonWithWeights p15 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);
        PersonWithWeights p16 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);
        PersonWithWeights p17 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);
        PersonWithWeights p18 = new PersonWithWeights("PM", PreferenceEnum.PM,0,false);

        List<PersonWithWeights> people = new ArrayList<>();
        people.add(p1);
        people.add(p2);
        people.add(p3);
        people.add(p4);
        people.add(p5);
        people.add(p6);
        people.add(p7);
        people.add(p8);

        people.add(p11);
        people.add(p12);
        people.add(p13);
        people.add(p14);
        people.add(p15);
        people.add(p16);
        people.add(p17);
        people.add(p18);

        PeopleInActivity a1 = new PeopleInActivity(1,PreferenceEnum.AM);
        PeopleInActivity a2 = new PeopleInActivity(2,PreferenceEnum.PM);
        List<PeopleInActivity> activities = new ArrayList<>();
        activities.add(a1);
        activities.add(a2);

        ActivitiesAssigner assigner = new ActivitiesAssigner(activities,people);
        assigner.createGroupsForActivities();
        List<PeopleInActivity> finished = assigner.getActivities();
        System.out.println(finished.size());
    }
}