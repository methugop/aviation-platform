import { fetchEmission, fetchAllEmissions } from '../api/emission/importEmissions';
import { VolcanoCodes, EmissionElements } from '@metservice/aviationtypes';

test('Fetching Emissions stats from Ruapehu and White Island', () => {
  describe('Fetching Ruapehu Sulfur Dioxide from Ruapheu', () => {
    fetchEmission(EmissionElements.SO2, VolcanoCodes.RU).then((emissionData) => {
      it('Expects the recorded measurement value to be a valid number', () => {
        const firstMeasurement = emissionData.data[0].measurement;
        expect(isNaN(firstMeasurement)).toBe(false);
      });
    })
  });

  describe('Fetching White Island Carbon Dioxide', () => {
    fetchEmission(EmissionElements.CO2, VolcanoCodes.WI).then((emissionData) => {
      it('Expects the recorded measurement value to be a valid number', () => {
        const firstMeasurement = emissionData.data[0].measurement;
        expect(isNaN(firstMeasurement)).toBe(false);
      });
    });
  });

  describe('Fecthing all Emissions at Ruapehu', () => {
    fetchAllEmissions(VolcanoCodes.RU).then((emissionData) => {
      it('Expects the returned value to be a valid object consisting of CO2, SO2 and H2S keys', () => {
        expect(emissionData.CO2.length).toBeGreaterThan(0);
        expect(emissionData.SO2.length).toBeGreaterThan(0);
        expect(emissionData.H2S.length).toBeGreaterThan(0);
      });
    });
  });
});
