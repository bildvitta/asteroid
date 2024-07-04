<template>
  <div class="container q-py-lg">
    <qas-box>
      <qas-label label="Employees" />

      <qas-toggle-visibility group="employees" text="999.999.999-99" />

      <qas-toggle-visibility group="employees" text="888.888.888-88" />

      <qas-toggle-visibility group="employees" text="777.777.777-77" />
    </qas-box>

    <qas-box class="q-mt-xl">
      <qas-label label="Customers" />

      <qas-toggle-visibility group="customers" text="999.999.999-99.999.999.999-99.999.999.999-99e" />

      <qas-toggle-visibility group="customers" text="888.888.888-88" />

      <qas-toggle-visibility group="customers" text="777.777.777-77" />
    </qas-box>

    <qas-box class="q-mt-xl">
      <qas-label label="Customers" />

      <div class="q-col-gutter-md row">
        <qas-toggle-visibility class="col-4" group="customers" text="999.999.999-99.999.999.999-99.999.999.999-99e" width="100%" />

        <qas-toggle-visibility class="col-4" group="customers" text="888.888.888-88" width="100%" />

        <qas-toggle-visibility class="col-4" group="customers" text="777.777.777-77" width="100%" />
      </div>
    </qas-box>
  </div>
</template>
