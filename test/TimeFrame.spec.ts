import {TimeFrame} from "../src/app/Service/TimeFrame";

describe('TimeFrame', () => {

    let timeFrame: TimeFrame = null;

    beforeEach(() => {
        timeFrame = new TimeFrame();
    });
    describe('Upon Creation', () => {
        it('should return the current date/time as a unix timestamp when requested', () => {
            let currentDate = Math.round((new Date()).valueOf() / 1000);
            expect(timeFrame.getNow()).toBe(currentDate);
        });
    });

    describe('Current Time Comparison', () => {
        let oneHour        = 3600;
        let thirtyMinutes  = 1800;
        let fifteenMinutes = 900;
        it('should convert a Date object to a unix timestamp', () => {
            let date      = new Date();
            let timestamp = Math.round(date.valueOf() / 1000);
            expect(timeFrame.getTimestampOfDate(date)).toEqual(timestamp);
        });

        it('should compare a timestamp against the current timestamp', () => {
            let timestamp = timeFrame.getNow() + oneHour;

            expect(timeFrame.isNowAfter(timestamp)).toBeFalsy();
            expect(timeFrame.isNowBefore(timestamp)).toBeTruthy();
        });

        it('should always return false if the timestamp provided is null', () => {
            let timestamp = null;
            expect(timeFrame.isNowAfter(timestamp)).toBeFalsy();
            expect(timeFrame.isNowBefore(timestamp)).toBeFalsy();
        });

        it('should compare between two timestamps', () => {
            let timestamp1 = timeFrame.getNow() - thirtyMinutes;
            let timestamp2 = timestamp1 + oneHour;
            expect(timeFrame.isNowBetween(timestamp1, timestamp2)).toBeTruthy();
            expect(timeFrame.isNowBetween(timestamp2, timestamp1)).toBeFalsy();
            expect(timeFrame.isNowBetween(timestamp1, timestamp1)).toBeFalsy();
            expect(timeFrame.isNowBetween(timestamp2, timestamp2)).toBeFalsy();
        });

        it('should compare the current timestamp against a timestamp and duration if applicable', () => {
            let startingTimestamp = timeFrame.getNow() - thirtyMinutes;
            expect(timeFrame.isNowDuring(startingTimestamp, oneHour)).toBeTruthy();
            expect(timeFrame.isNowDuring(startingTimestamp, fifteenMinutes)).toBeFalsy();
        })
    });
});
