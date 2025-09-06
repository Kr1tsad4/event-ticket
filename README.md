# Event Booking & Ticketing System (work in progress)
## Authentication & User
- สมัคร/ล็อกอิน 
- Role: Admin (สร้าง/จัดการ event) / User (จองตั๋ว)
- Profile: user สามารถดู history การจองได้
## Event Management
### Admin role
- CRUD event (ชื่อ, วันเวลา, สถานที่, ราคา, จำนวนบัตร)
- Upload รูป event
- ดูจำนวนตั๋วที่ถูกจองแล้ว
### User role
- ดูรายการ event ทั้งหมด
- ค้นหา/Filter (ตามวันที่, สถานที่, หมวดหมู่)
- กดจองตั๋ว
## Booking System
- Book Ticket ตัดจำนวนตั๋วใน event
- แสดง Booking Confirmation
- Realtime update เมื่อบัตร sold out
