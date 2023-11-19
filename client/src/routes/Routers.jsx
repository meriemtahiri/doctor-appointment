import { Routes, Route} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Services from '../pages/Services/Services'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Doctors from '../pages/Doctors/Doctors'
import NotPatient from '../pages/NotPatient'
import Feedback from '../pages/Feedback/Feedback'
import Dashboard from '../pages/patientSection/Dashboard/dashboard'
import Notification from '../pages/patientSection/Notification/notification'
import Booking from '../pages/patientSection/Booking/booking'
import HistoryP from '../pages/patientSection/History/history'
import AppointmentD from '../pages/doctorSection/Appointment/appointment'
import HistoryD from '../pages/doctorSection/History/history'
import CreateDoctor from '../pages/adminSection/createDoctor'
import Info from '../pages/adminSection/info'

const Routers = () => {
  return <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="doctors/feedback/:doctorId" element={<Feedback />} />
    <Route path="/notpatient" element={<NotPatient />} />
    <Route path="/mybooking" element={<Dashboard />} />
    <Route path="/patient/notification" element={<Notification />} />
    <Route path="/patient/booking/:doctorId" element={<Booking />} />
    <Route path="/history/:appointmentId" element={<HistoryP />} />
    <Route path="/appointment" element={<AppointmentD />} />
    <Route path="/patient/historyD/:appointmentId" element={<HistoryD />} />
    <Route path="/createDoctor" element={<CreateDoctor />} />
    <Route path="/info" element={<Info />} />

  </Routes>
}
export default Routers
