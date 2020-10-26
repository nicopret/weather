
export class Formatters {

    dateFormatter = (input: number) => {
        return new Intl.DateTimeFormat('en_GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(new Date(input));
    }

    hourFormatter = (input: number) => {
        const date = new Date(input);
        return date.getHours();
    }

    timeFormatter = (input: number) => {
        return new Intl.DateTimeFormat('en-GB', {
            hour: 'numeric',
            hour12: true,
            minute: '2-digit'
        }).format(new Date(input));
    }

}