import './DateTime.css'

export function DateTime(datetime: Date)
{
    return (
        <p className="date-time">{datetime.getDay().toString()}, {datetime.getDate().toString()}, {datetime.toLocaleTimeString()}</p>
    )
}