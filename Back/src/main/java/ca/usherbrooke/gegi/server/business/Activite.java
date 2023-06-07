package ca.usherbrooke.gegi.server.business;

import java.util.List;

public class Activite {
    public String numero;
    public String type;

    public String toString() {
        return  this.numero + "-" + this.type;
    }
}

