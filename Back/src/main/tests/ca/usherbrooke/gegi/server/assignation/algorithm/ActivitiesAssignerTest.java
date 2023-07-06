package ca.usherbrooke.gegi.server.assignation.algorithm;

import ca.usherbrooke.gegi.server.assignation.models.PeopleInActivity;
import ca.usherbrooke.gegi.server.assignation.models.PersonWithWeights;
import ca.usherbrooke.gegi.server.assignation.models.PreferenceEnum;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ActivitiesAssignerTest {
    private ArrayList<PersonWithWeights> createPeople(int count)
    {
        ArrayList<PersonWithWeights> people = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            boolean isWillingToBeAttendant = count % i == 3;

            PreferenceEnum preference = PreferenceEnum.PM;
            if (i % 2 == 0)
            {
                preference = PreferenceEnum.AM;
            }
            float ratioIntendance = i % 3 == 0 ? (float) 0.5 : 0;

            StringBuilder builder = new StringBuilder();

            builder.append(PreferenceEnum.AM.toString());

            if (isWillingToBeAttendant)
            {
                builder.append("-A");
            }

            PersonWithWeights person = new PersonWithWeights(builder.toString(), preference,ratioIntendance,isWillingToBeAttendant);
            people.add(person);
        }
        return people;
    }
    @Test
    void TestAssignation()
    {
        List<PersonWithWeights> people = createPeople(50);

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