import { FormEvent, useState } from 'react';
import { categories } from '../data/awards';

export function Nominate() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="page-section form-page">
      <span className="eyebrow">Nomination form</span>
      <h1>Submit a creator, work, proof trail, or category candidate.</h1>
      <p className="lead">This form is wired as a production-ready frontend placeholder. It validates the intended fields locally until a live intake endpoint is connected.</p>
      <form className="glass-card nomination-form" onSubmit={onSubmit}>
        <label>Work or creator name<input required name="title" placeholder="Godspeed, Beatify Group, etc." /></label>
        <label>Creator handle<input required name="handle" placeholder="@creator" /></label>
        <label>Category<select required name="category"><option value="">Choose a category</option>{categories.map((category) => <option key={category.id}>{category.title}</option>)}</select></label>
        <label>Creator node or public URL<input required name="origin" type="url" placeholder="https://certifyd.example.com/buy/..." /></label>
        <label>Proof summary<textarea required name="proof" rows={5} placeholder="List receipts, manifests, contributors, hashes, or public records." /></label>
        <button className="primary-action" type="submit">Preview submission</button>
        {submitted ? <p className="success-message">Submission preview captured locally. Connect an intake endpoint before accepting live nominations.</p> : null}
      </form>
    </section>
  );
}
