import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

function Charts({ events }) {
  if (!events || events.length === 0) return <p>No event data for charts</p>;

  const revenueData = events.map((event) => ({
    name: event.title,
    value: event.ticketBooked * event.price,
  }));

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-8">
      <div className="bg-white shadow rounded-lg p-4 flex-1 min-w-[250px]">
        <h2 className="font-semibold mb-2">Tickets Booked Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={events}>
            <XAxis 
              dataKey="title" 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={60} 
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="ticketBooked" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow rounded-lg p-4 flex-1 min-w-[250px]">
        <h2 className="font-semibold mb-2">Revenue Per Event</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis 
              dataKey="name" 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={60} 
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value} ฿`} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Bar dataKey="value" fill="#8884d8" /> 
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
