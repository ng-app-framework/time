export class TimeFrame {
    getNow() {
        return this.getTimestampOfDate(new Date());
    }

    getTimestampOfDate(date: Date) {
        return Math.round(date.valueOf() / 1000);
    }

    isNowAfter(timestamp: number) {
        return timestamp && this.getNow() > timestamp;
    }

    isNowBefore(timestamp: number) {
        return timestamp && this.getNow() < timestamp;
    }

    isNowBetween(afterTimestamp: number, beforeTimestamp: number) {
        return this.isNowAfter(afterTimestamp) && this.isNowBefore(beforeTimestamp);
    }

    isNowDuring(startingTimestamp: number, durationInSeconds: number) {
        return this.isNowBetween(startingTimestamp, startingTimestamp + durationInSeconds);
    }
}
