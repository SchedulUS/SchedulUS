package ca.usherbrooke.gegi.server.business;

import java.util.List;


public class Activite {
    public int activiteId;
    public String activiteNom;
    public String groupeNom;
    public String local;
    public String debut;
    public String fin;
    public int appId;
    public String appNom;
    public String appCours;
    public int typeId;
    public String typeNom;

    public String toString() {
        return  this.activiteNom;
    }
}
