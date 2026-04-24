<script lang="ts">
  import {appLocale} from "$lib/dp/locale.svelte.ts";
</script>

<!-- @wc-ignore -->
<article class="prose max-w-none mb-6"><h1 class="mt-4">Nutzungsbedingungen für die Web-App der Berlin
  Skylarks</h1>

  {#if appLocale.current === "de"}
    <section lang="de">
      <p>Die Web-App wird bereitgestellt von der <strong>Turngemeinde in Berlin e.V. Abteilung Baseball</strong>.</p>

      <h2>1. Geltungsbereich</h2>
      <p>Diese Nutzungsbedingungen regeln die Nutzung der Web-App der Berlin Skylarks („die App“) durch Mitglieder des
        gemeinnützigen Baseballvereins "Berlin Skylarks".</p>

      <h2>2. Nutzungsvoraussetzungen</h2>
      <ul>
        <li>Die Nutzung der App ist ausschließlich Vereinsmitgliedern vorbehalten.</li>
        <li>Eine Registrierung und Anmeldung sind erforderlich, um an Vereinsaktivitäten wie Spielen, Turnieren und
          Trainingseinheiten teilzunehmen.
        </li>
        <li>Die Nutzung ist kostenlos und mit dem Mitgliedsbeitrag abgegolten.</li>
      </ul>

      <h2>3. Datenschutz und Datennutzung</h2>
      <ul>
        <li>Alle in der App erhobenen Daten werden ausschließlich zur Organisation und Verwaltung von Vereinsaktivitäten
          verwendet.
        </li>
        <li>Es gibt kein Tracking, keine Werbung, keine Social-Media-Integration und keine Einbindung externer Dienste.
        </li>
        <li>Auf Anfrage und bei Beendigung der Mitgliedschaft werden alle personenbezogenen Daten unverzüglich gelöscht.
        </li>
      </ul>

      <h2>4. Verhaltensregeln</h2>
      <ul>
        <li>Die Mitglieder verpflichten sich, die App ausschließlich im Rahmen ihrer Vereinsmitgliedschaft und in gutem
          Glauben zu nutzen.
        </li>
        <li>Eine missbräuchliche Nutzung, insbesondere zum Schaden des Vereins oder seiner Mitglieder, ist untersagt.
        </li>
      </ul>

      <h2>5. Open-Source-Kodex</h2>
      <p>Der gesamte Code der App ist frei verfügbar und kann eingesehen werden.</p>

      <h2>6. Haftungsausschluss</h2>
      <p>Die Berlin Skylarks übernehmen keine Haftung für technische Fehler, Datenverluste oder sonstige Schäden, die
        aus
        der Nutzung der App entstehen könnten.</p>

      <h2>7. Änderungen der Nutzungsbedingungen</h2>
      <p>Der Verein behält sich das Recht vor, diese Nutzungsbedingungen bei Bedarf zu aktualisieren. Mitglieder werden
        über
        wesentliche Änderungen informiert.</p>

      <h2>8. Kontakt</h2>
      <p>Bei Fragen oder Anliegen zur Nutzung der App kann die Abteilungsleitung der Berlin Skylarks kontaktiert
        werden:</p>
      <a href="mailto:vorstand@tib-baseball.de">vorstand@tib-baseball.de</a>
      <p>Bei technischen Fragen und Fehlern:</p>
      <a href="mailto:app@tib-baseball.de">app@tib-baseball.de</a>
    </section>

  {:else }
    <section lang="en">
      <h2 class="h2">Terms & Conditions for the Berlin Skylarks Web App</h2>

      <p>The web app is provided by <strong>Turngemeinde in Berlin e.V. Abteilung Baseball</strong>.</p>

      <h2>1. Scope</h2>
      <p>These Terms & Conditions govern the use of the Berlin Skylarks web app ("the App") by members of the non-profit
        baseball club "Berlin Skylarks".</p>

      <h2>2. Eligibility</h2>
      <ul>
        <li>The App is exclusively available to club members.</li>
        <li>Registration and login are required to participate in club activities such as games, tournaments, and
          training
          sessions.
        </li>
        <li>Use of the App including all backend services is free and covered by the membership fee.</li>
      </ul>

      <h2>3. Data Privacy & Usage</h2>
      <ul>
        <li>All data collected within the App is used solely for organizing and managing club activities.</li>
        <li>There is no tracking, no advertising, no social media integration, and no use of external services.</li>
        <li>Upon request or termination of club membership, all personal data will be promptly deleted.</li>
      </ul>

      <h2>4. Code of Conduct</h2>
      <ul>
        <li>Members agree to use the App only within the scope of their club membership and in good faith.</li>
        <li>Misuse, especially actions harmful to the club or its members, is strictly prohibited.</li>
      </ul>

      <h2>5. Open-Source Policy</h2>
      <p>The entire code of the App is publicly available and can be reviewed.</p>

      <h2>6. Disclaimer of Liability</h2>
      <p>The Berlin Skylarks assume no liability for technical errors, data loss, or any other damages resulting from
        the
        use of the App.</p>

      <h2>7. Changes to the Terms & Conditions</h2>
      <p>The club reserves the right to update these Terms & Conditions when necessary. Members will be informed of any
        significant changes.</p>

      <h2>8. Contact</h2>
      <p>For any questions or concerns regarding the App, members can contact the Berlin Skylarks board:</p>
      <a href="mailto:vorstand@tib-baseball.de">vorstand@tib-baseball.de</a>
      <p>In case of technical issues and bugs:</p>
      <a href="mailto:app@tib-baseball.de">app@tib-baseball.de</a>
    </section>
  {/if}
</article>
