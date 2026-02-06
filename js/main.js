// Code für Scroll Animation

// Sofort ausgeführte Funktion < Code läuft automatisch beim Laden
(function init() {
  "use strict"; // Strenger Modus < verhindert häufige Programmierfehler

  // 1. Elemente sammeln
  // Sucht ALLE HTML-Elemente mit Klasse "reveal" und speichert sie in reveals
  const reveals = document.querySelectorAll('.reveal');

  // Custom Property aus CSS < Zugriff auf :root < ohne root kann JS die CSS-Variable nicht setzen, Animation klappt nicht, Elemente bleiben unsichtbar
  const root = document.querySelector(":root");
  
  // Custom Property dynamisch setzen < Zugriff auf Custom Properties
  root.style.setProperty('--transition-duration', '0.8s');

  // 2. Callback < Diese Funktion wird ausgeführt, wenn Elemente sichtbar werden
  function loadReveal(entries) {
    // entries = Liste aller Elemente, die gerade ihren Sichtbarkeits Status ändern

    // Gehe jedes Element in der Liste einzeln durch
    entries.forEach(entry => {

      // Prüfen: ist dieses Element jetzt im sichtbaren Bereich?
      if (entry.isIntersecting) {
        // ja < Füge CSS-Klasse "active" hinzu (macht Element sichtbar)
        entry.target.classList.add('active');
      }
    });
  }

  // Options < Einstellungen für den Observer
  const options = {
    root: null, // null = beobachte das Browserfenster (Viewport), nicht einen speziellen Container
    rootMargin: "-100px", // Element muss 100px weiter ins Bild scrollen, ca. ein Finger breit
    threshold: 0.15 // Animation startet, wenn 15% vom Element sichtbar sind
  }
  // 3. Observer erstellen < Erzeugt den Beobachter mit der Callback-Funktion < Beobachter existiert, aber beobachtet noch nichts
  const observer = new IntersectionObserver(loadReveal, options);
  // Kombination < Legt fest, wann ein Objekt als aktiv gilt und definiert seinen Aktivzustand; nur dadurch wird der Effekt ausgelöst

  // Elemente observieren < Sage dem Observer, welche Elemente er beobachten soll
  // Geht durch alle .reveal Elemente
  reveals.forEach(reveal => {
    // Starte Beobachtung für dieses einzelne Element
    observer.observe(reveal);
  });

})();