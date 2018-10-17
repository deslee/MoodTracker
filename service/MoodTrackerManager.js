import { AsyncStorage } from 'react-native';
import moment from 'moment';
import guid from '../helpers/guid';

const key = '@MoodTracker';

export class Manager {
    constructor(storage) {
        this.observers = [];
        this.storage = storage;
    }

    deleteMood = (id) => {
        return this.getAllMoods().then(moods => {
            return this.storage.setItem(`${key}:moods`, JSON.stringify(moods.filter(m => m.id !== id)));
        }).then(() => this.notifyObservers());
    }

    saveMood = (mood) => {
        return this.getAllMoods().then(moods => {
            const found = moods.find(m => m.id === mood.id);
            if (found) {
                moods = moods.map(m => m.id === mood.id ? mood : m);
            } else {
                moods.push(mood);
            }
            return this.storage.setItem(`${key}:moods`, JSON.stringify(moods));
        }).then(() => this.notifyObservers());
    }

    getAllMoods = () => {
        return this.storage.getItem(`${key}:moods`)
            .then(moods => JSON.parse((moods || '[]')))
            .then(moods => moods.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()))
    }

    getMoodText = (value) => {
        switch (value) {
            case 1:
                return "Horrible";
            case 2:
                return "Sad";
            case 3:
                return "Meh";
            case 4:
                return "Positive";
            case 5:
                return "Happy";
            default:
                return null;
        }
    }

    getMoodTimeText = (date) => {
        return moment(date).format("h:mm a")
    }

    getMoodDateText = (date) => {
        return moment(date).format("dddd, MMMM Do YYYY")
    }

    notifyObservers = () => {
        this.observers.forEach(obs => {
            obs.fn();
        })
    }

    addObserver = (fn) => {
        const id = guid();
        this.observers.push({
            id,
            fn
        });

        return () => {
            this.removeObserver(id);
        }
    }

    removeObserver = (id) => {
        this.observers = this.observers.filter(obs => obs.id !== id);
    }
}

let manager = new Manager(AsyncStorage);

export default {
    deleteMood: manager.deleteMood,
    saveMood: manager.saveMood,
    getAllMoods: manager.getAllMoods,
    getMoodText: manager.getMoodText,
    getMoodTimeText: manager.getMoodTimeText,
    getMoodDateText: manager.getMoodDateText,
    addObserver: manager.addObserver
}