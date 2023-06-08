package ca.usherbrooke.gegi.server.assignation.converters;

import ca.usherbrooke.gegi.server.assignation.models.PersonWithRange;
import ca.usherbrooke.gegi.server.assignation.models.PersonWithWeights;
import ca.usherbrooke.gegi.server.assignation.models.RandomCasesEnum;

public class WeightsToRangeConverter
{
    public static PersonWithRange DefineRange(RandomCasesEnum randomCase, PersonWithWeights person, float start)
    {
        return switch (randomCase)
        {
            case AM -> CreateRangeAM(person,start);
            case PM -> CreateRangePM(person,start);
            case Intendence -> CreateRangeIntendence(person,start);
        };
    }
    static PersonWithRange CreateRangeAM(PersonWithWeights person, float start)
    {
        float end = person.getPoidsAM() + start;
        return new PersonWithRange(person.getCIP(),start,end);
    }
    static PersonWithRange CreateRangePM(PersonWithWeights person, float start)
    {
        float end = person.getPoidsPM() + start;
        return new PersonWithRange(person.getCIP(),start,end);
    }
    static PersonWithRange CreateRangeIntendence(PersonWithWeights person, float start)
    {
        float end = person.getPoidsIntendance() + start;
        return new PersonWithRange(person.getCIP(),start,end);
    }
}
