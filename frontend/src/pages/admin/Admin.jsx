import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { toursApi, adminApi } from "../../services/api";

const emptyTour = {
  title: "",
  titleEs: "",
  slug: "",
  category: "Desert Tours",
  categoryEs: "Tours por el desierto",
  destination: "",
  destinationEs: "",
  duration: "",
  durationEs: "",
  price: 0,
  imageUrl: "",
  shortDescription: "",
  shortDescriptionEs: "",
  description: "",
  descriptionEs: "",
  route: "",
  routeEs: "",
  itinerary: "",
  itineraryEs: "",
};

const tabs = [
  { name: "Overview", icon: BarChart3 },
  { name: "Tours", icon: MapPin },
  { name: "Bookings", icon: CalendarDays },
  { name: "Messages", icon: Mail },
];

export default function Admin() {
  const [tab, setTab] = useState("Overview");

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  function logout() {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [tourData, bookingData, messageData] = await Promise.all([
        toursApi.all(),
        adminApi.bookings(),
        adminApi.messages(),
      ]);

      setTours(tourData || []);
      setBookings(bookingData || []);
      setMessages(messageData || []);
    } catch (err) {
      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function changeTab(name) {
    setTab(name);
    setSidebarOpen(false);
  }

  async function deleteTour(tour) {
    const confirmed = window.confirm(
      `Delete "${tour.title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await toursApi.remove(tour.id);
      await load();
    } catch (err) {
      window.alert("Unable to delete this tour.");
    }
  }

  return (
    <div className="adminDashboard">
      <aside className={`adminSidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="adminBrand">
          <img src="/images/logo.png" alt="Best Morocco" />
        </div>

        <nav className="adminNav">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              className={tab === name ? "active" : ""}
              onClick={() => changeTab(name)}
            >
              <Icon size={19} />
              <span>{name}</span>

              {name === "Bookings" && bookings.length > 0 && (
                <small>{bookings.length}</small>
              )}

              {name === "Messages" && messages.length > 0 && (
                <small>{messages.length}</small>
              )}
            </button>
          ))}
        </nav>

        <div className="adminSidebarBottom">
          <a href="/" target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            View website
          </a>

          <span>Best Morocco Experience</span>

          <small>© 2026 Admin Dashboard</small>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="adminSidebarOverlay"
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="adminMain">
        <header className="adminTopbar">
          <div className="adminTopbarLeft">
            <button
              className="adminMenuButton"
              type="button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>

            <div>
              <span>ADMINISTRATION</span>
              <h1>{tab}</h1>
            </div>
          </div>

          <div className="adminTopbarActions">
            <button className="adminRefresh" type="button" onClick={logout}>
              Logout
            </button>

            <button
              className="adminRefresh"
              type="button"
              onClick={load}
              disabled={loading}
            >
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>
        </header>

        <section className="adminContent">
          {error && <div className="adminError">{error}</div>}

          {loading ? (
            <div className="adminLoading">
              <RefreshCw className="adminSpin" />
              <span>Loading dashboard...</span>
            </div>
          ) : (
            <>
              {tab === "Overview" && (
                <Overview
                  tours={tours}
                  bookings={bookings}
                  messages={messages}
                  changeTab={changeTab}
                />
              )}

              {tab === "Tours" && (
                <Tours
                  tours={tours}
                  edit={setEditing}
                  remove={deleteTour}
                  add={() => setEditing({ ...emptyTour })}
                />
              )}

              {tab === "Bookings" && <Bookings rows={bookings} />}

              {tab === "Messages" && <Messages rows={messages} />}
            </>
          )}
        </section>
      </main>

      {editing && (
        <TourModal
          tour={editing}
          close={() => setEditing(null)}
          saved={async () => {
            setEditing(null);
            await load();
          }}
        />
      )}
    </div>
  );
}

function Overview({ tours, bookings, messages, changeTab }) {
  const recentBookings = bookings.slice(0, 4);
  const recentMessages = messages.slice(0, 4);

  return (
    <>
      <div className="adminWelcome">
        <div>
          <span>BEST MOROCCO EXPERIENCE</span>
          <h2>Welcome to your dashboard.</h2>
          <p>
            Manage your journeys, customer requests and messages from one place.
          </p>
        </div>
      </div>

      <div className="adminStats">
        <Stat
          icon={MapPin}
          number={tours.length}
          title="Tours"
          text="Published journeys"
          onClick={() => changeTab("Tours")}
        />

        <Stat
          icon={CalendarDays}
          number={bookings.length}
          title="Bookings"
          text="Travel requests"
          onClick={() => changeTab("Bookings")}
        />

        <Stat
          icon={Mail}
          number={messages.length}
          title="Messages"
          text="Contact messages"
          onClick={() => changeTab("Messages")}
        />

        <Stat
          icon={Users}
          number={bookings.reduce(
            (total, booking) => total + (Number(booking.travelers) || 0),
            0,
          )}
          title="Travelers"
          text="Requested travelers"
        />
      </div>

      <div className="adminOverviewGrid">
        <section className="adminPanel">
          <div className="adminPanelHead">
            <div>
              <span>RECENT ACTIVITY</span>
              <h3>Latest bookings</h3>
            </div>

            <button type="button" onClick={() => changeTab("Bookings")}>
              View all
            </button>
          </div>

          {recentBookings.length ? (
            <div className="adminMiniList">
              {recentBookings.map((booking, index) => (
                <div key={booking.id || index}>
                  <div>
                    <strong>{booking.name || "Unknown traveler"}</strong>
                    <span>
                      {booking.email || booking.phone || "No contact details"}
                    </span>
                  </div>

                  <small>
                    {booking.travelDate || booking.date || "Date not specified"}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="No bookings yet"
              text="New travel requests will appear here."
            />
          )}
        </section>

        <section className="adminPanel">
          <div className="adminPanelHead">
            <div>
              <span>INBOX</span>
              <h3>Latest messages</h3>
            </div>

            <button type="button" onClick={() => changeTab("Messages")}>
              View all
            </button>
          </div>

          {recentMessages.length ? (
            <div className="adminMiniList">
              {recentMessages.map((message, index) => (
                <div key={message.id || index}>
                  <div>
                    <strong>{message.name || "Website visitor"}</strong>
                    <span>
                      {message.subject || message.email || "Contact message"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Mail}
              title="No messages yet"
              text="Website contact messages will appear here."
            />
          )}
        </section>
      </div>
    </>
  );
}

function Stat({ icon: Icon, number, title, text, onClick }) {
  const content = (
    <>
      <div className="adminStatIcon">
        <Icon size={22} />
      </div>

      <div>
        <strong>{number}</strong>
        <h3>{title}</h3>
        <span>{text}</span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button className="adminStat" type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className="adminStat">{content}</div>;
}

function Tours({ tours, edit, remove, add }) {
  if (!tours.length) {
    return (
      <EmptyState
        icon={MapPin}
        title="No tours yet"
        text="Create your first Morocco experience."
        action="Add tour"
        onAction={add}
      />
    );
  }

  return (
    <div className="adminToursGrid">
      {tours.map((tour) => (
        <article className="adminTourCard" key={tour.id}>
          <div className="adminTourImage">
            {tour.imageUrl ? (
              <img src={tour.imageUrl} alt={tour.title} />
            ) : (
              <div className="adminNoImage">
                <MapPin />
              </div>
            )}

            <span>{tour.category || "Tour"}</span>
          </div>

          <div className="adminTourBody">
            <small>{tour.destination || "Morocco"}</small>
            <h3>{tour.title}</h3>

            <p>
              {tour.shortDescription ||
                "No short description has been added yet."}
            </p>

            <div className="adminTourMeta">
              <span>{tour.duration || "Duration not set"}</span>
              <strong>€{tour.price ?? 0}</strong>
            </div>

            <div className="adminTourActions">
              <button type="button" onClick={() => edit(tour)}>
                <Pencil size={16} />
                Edit
              </button>

              <button
                className="danger"
                type="button"
                onClick={() => remove(tour)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Bookings({ rows }) {
  if (!rows.length) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No booking requests yet"
        text="Requests sent from the booking page will appear here."
      />
    );
  }

  return (
    <div className="adminTableWrap">
      <table className="adminTable">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Travel date</th>
            <th>Travelers</th>
            <th>Destination / Tour</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              <td>
                <strong>{row.name || "—"}</strong>
                <span>{row.email || "—"}</span>
              </td>

              <td>{row.phone || "—"}</td>

              <td>{row.travelDate || row.date || "—"}</td>

              <td>{row.travelers || "—"}</td>

              <td>
                {row.destination ||
                  row.tour ||
                  row.tourTitle ||
                  "Custom journey"}
              </td>

              <td className="adminMessageCell">{row.message || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Messages({ rows }) {
  if (!rows.length) {
    return (
      <EmptyState
        icon={Mail}
        title="No messages yet"
        text="Messages sent from the contact page will appear here."
      />
    );
  }

  return (
    <div className="adminMessages">
      {rows.map((row, index) => (
        <article key={row.id || index} className="adminMessage">
          <div className="adminMessageAvatar">
            {(row.name || "V").charAt(0).toUpperCase()}
          </div>

          <div className="adminMessageContent">
            <div className="adminMessageHead">
              <div>
                <h3>{row.name || "Website visitor"}</h3>
                <a href={`mailto:${row.email}`}>{row.email || "No email"}</a>
              </div>

              {row.subject && <span>{row.subject}</span>}
            </div>

            <p>{row.message || "No message content."}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, title, text, action, onAction }) {
  return (
    <div className="adminEmpty">
      <Icon size={34} />
      <h3>{title}</h3>
      <p>{text}</p>

      {action && (
        <button className="btn" type="button" onClick={onAction}>
          <Plus size={17} />
          {action}
        </button>
      )}
    </div>
  );
}

function TourModal({ tour, close, saved }) {
  const [form, setForm] = useState({ ...emptyTour, ...tour });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function change(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  async function uploadImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      setUploading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch("http://localhost:8080/api/admin/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const url = await response.text();

      setForm((current) => ({
        ...current,
        imageUrl: "http://localhost:8080" + url,
      }));
    } catch (e) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function submit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (tour.id) {
        await toursApi.update(tour.id, form);
      } else {
        await toursApi.create(form);
      }

      await saved();
    } catch (err) {
      setError("Unable to save this tour. Please check the information.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="adminModalBackdrop" onMouseDown={close}>
      <div
        className="adminModal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="adminModalHeader">
          <div>
            <span>TOUR MANAGEMENT</span>
            <h2>{tour.id ? "Edit tour" : "Add new tour"}</h2>
          </div>

          <button type="button" onClick={close}>
            <X />
          </button>
        </header>

        <form onSubmit={submit}>
          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <span>01</span>
              <div>
                <h3>General information</h3>
                <p>Main information used throughout the website.</p>
              </div>
            </div>

            <div className="adminFormGrid">
              <Field
                label="English title"
                name="title"
                value={form.title}
                change={change}
                required
              />

              <Field
                label="Slug"
                name="slug"
                value={form.slug}
                change={change}
                required
                placeholder="3-days-marrakech-merzouga"
              />

              <Field
                label="Category"
                name="category"
                value={form.category}
                change={change}
              />

              <Field
                label="Destination"
                name="destination"
                value={form.destination}
                change={change}
              />

              <Field
                label="Duration"
                name="duration"
                value={form.duration}
                change={change}
                placeholder="3 Days / 2 Nights"
              />

              <Field
                label="Price (€)"
                name="price"
                type="number"
                min="0"
                value={form.price}
                change={change}
              />

              <div className="adminField full">
                <label>Tour image</label>

                <input type="file" accept="image/*" onChange={uploadImage} />

                {uploading && <p>Uploading...</p>}

                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    style={{
                      width: "200px",
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <span>02</span>
              <div>
                <h3>English content</h3>
                <p>Content displayed when the website is in English.</p>
              </div>
            </div>

            <div className="adminFormGrid">
              <div className="adminField full">
                <label>Short description</label>
                <textarea
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={change}
                  rows="3"
                />
              </div>

              <div className="adminField full">
                <label>Route</label>
                <input
                  name="route"
                  value={form.route}
                  onChange={change}
                  placeholder="Marrakech → Ait Ben Haddou → Merzouga"
                />
              </div>

              <div className="adminField full">
                <label>Full description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={change}
                  rows="5"
                />
              </div>

              <div className="adminField full">
                <label>Itinerary</label>
                <textarea
                  name="itinerary"
                  value={form.itinerary}
                  onChange={change}
                  rows="7"
                  placeholder="Day one details | Day two details | Day three details"
                />
                <small>Separate each day with the | character.</small>
              </div>
            </div>
          </div>

          <div className="adminFormSection">
            <div className="adminFormSectionTitle">
              <span>03</span>
              <div>
                <h3>Spanish content</h3>
                <p>Spanish version of the journey.</p>
              </div>
            </div>

            <div className="adminFormGrid">
              <Field
                label="Spanish title"
                name="titleEs"
                value={form.titleEs}
                change={change}
              />

              <Field
                label="Spanish category"
                name="categoryEs"
                value={form.categoryEs}
                change={change}
              />

              <Field
                label="Spanish destination"
                name="destinationEs"
                value={form.destinationEs}
                change={change}
              />

              <Field
                label="Spanish duration"
                name="durationEs"
                value={form.durationEs}
                change={change}
              />

              <div className="adminField full">
                <label>Spanish short description</label>
                <textarea
                  name="shortDescriptionEs"
                  value={form.shortDescriptionEs}
                  onChange={change}
                  rows="3"
                />
              </div>

              <div className="adminField full">
                <label>Spanish route</label>
                <input name="routeEs" value={form.routeEs} onChange={change} />
              </div>

              <div className="adminField full">
                <label>Spanish full description</label>
                <textarea
                  name="descriptionEs"
                  value={form.descriptionEs}
                  onChange={change}
                  rows="5"
                />
              </div>

              <div className="adminField full">
                <label>Spanish itinerary</label>
                <textarea
                  name="itineraryEs"
                  value={form.itineraryEs}
                  onChange={change}
                  rows="7"
                />
                <small>Separate each day with the | character.</small>
              </div>
            </div>
          </div>

          {error && <div className="adminModalError">{error}</div>}

          <footer className="adminModalFooter">
            <button
              className="adminCancel"
              type="button"
              onClick={close}
              disabled={saving}
            >
              Cancel
            </button>

            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : tour.id ? "Save changes" : "Create tour"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  change,
  type = "text",
  required = false,
  placeholder = "",
  min,
}) {
  return (
    <div className="adminField">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        required={required}
        value={value ?? ""}
        onChange={change}
        placeholder={placeholder}
      />
    </div>
  );
}
