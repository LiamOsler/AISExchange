const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema({
    vesselName: {   // This is the name of the vessel of the user
        type: String,
        required: true,
    },
    vesselType: {   // Fishing vessel, cargo ship, etc.
        type: String,
    },
    vesselDescription: {   // Fishing vessel, cargo ship, etc.
        type: String,
    },
    vesselFlag: {  // Country of registration as ISO code
        type: String,
    },
    vesselRegistration: {   // IMO number, MMSI number, etc.
        type: String,
    },
    vesselLength: { // in meters
        type: Number,
    },
    vesselBeam: { // in meters
        type: Number,
    },
    vesselDraft: { // in meters
        type: Number,
    },
    vesselDisplacement: { // in tons
        type: Number,
    },
    vesselSailArea: { // in square meters
        type: Number,
    },
    vesselEngine: {
        type: String,
    },
    vesselEnginePower: { // in horsepower
        type: Number,
    },
    vesselFuelCapacity: { // in liters
        type: Number,
    },
    vesselWaterCapacity: { // in liters
        type: Number,
    },
    vesselWasteCapacity: { // in liters
        type: Number,
    },
    vesselNavigationEquipment: {
        type: String,
    },
    vesselCommunicationEquipment: {
        type: String,
    },
    vesselSafetyEquipment: {
        type: String,
    },
    vesselOtherEquipment: {
        type: String,
    },
    vesselCrew: { // Name of the crew
        type: String,
    },
    vesselCrewNumber: { // Number of crew members
        type: Number,
    },
    vesselCrewNationality: {
        type: String,
    },
    vesselCrewLanguages: {
        type: String,
    },
    vesselCrewTraining: {
        type: String,
    },
});

const Vessel = mongoose.model('Vessel', vesselSchema);