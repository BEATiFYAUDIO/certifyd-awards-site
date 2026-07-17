import { FormEvent, useState } from 'react';
import { categories } from '../data/awards';

export function Nominate() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="standard-title-hero">
        <div className="standard-title-hero-content">
          <span className="eyebrow">Nominations</span>
          <h1>Submit a Nomination</h1>
          <p className="lead">Tell us about a creator, work, collaboration, platform, provider, or technical contribution that made a meaningful impact.</p>
        </div>
      </section>
      <section className="page-section form-page standard-page-content">
        <p className="muted">Supporting links help us understand the work, confirm credits, and recognize everyone involved.</p>
        <form className="glass-card nomination-form" onSubmit={onSubmit}>
          <label>Work, creator, collaboration, or contribution<input required name="title" placeholder="A work, a producer, a platform, etc." /></label>
          <label>Creator or contributor handle<input required name="handle" placeholder="@creator or contributor name" /></label>
          <label>Category<select required name="category"><option value="">Choose a category</option>{categories.map((category) => <option key={category.id}>{category.title}</option>)}</select></label>
          <label>Public work, profile, or supporting URL<input required name="origin" type="url" placeholder="https://certifyd.example.com/buy/..." /></label>
          <label>Why should this be recognized?<textarea required name="proof" rows={5} placeholder="Tell the story, list contributors, and include receipts, manifests, credits, hashes, or public records when available." /></label>
          <button className="primary-action" type="submit">Preview nomination</button>
          {submitted ? <p className="success-message">Nomination preview captured locally. Connect an intake endpoint before accepting live nominations.</p> : null}
        </form>
      </section>
    </>
  );
}
