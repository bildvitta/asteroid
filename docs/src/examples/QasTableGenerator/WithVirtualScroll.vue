<template>
  <qas-table-generator class="with-virtual-scroll" :fields="fields" :results="results" row-key="uuid" use-virtual-scroll />
</template>

<script setup>
defineOptions({ name: 'WithVirtualScroll' })

const fields = {
  email: { type: 'text', name: 'email', label: 'E-mail' },
  name: { type: 'text', name: 'name', label: 'Nome' },
  phone: { type: 'text', name: 'phone', label: 'Telefone', mask: 'phone' }
}

const results = [
  { uuid: '1a2b3c4d-1111-2222-3333-444455556666', name: 'Alice Johnson', email: 'alice@gmail.com', phone: '9999999901' },
  { uuid: '1a2b3c4d-2222-3333-4444-555566667777', name: 'Bob Smith', email: 'bob@example.com', phone: '9999999902' },
  { uuid: '1a2b3c4d-3333-4444-5555-666677778888', name: 'Charlie Brown', email: 'charlie@example.com', phone: '9999999903' },
  { uuid: '1a2b3c4d-4444-5555-6666-777788889999', name: 'David White', email: 'david@example.com', phone: '9999999904' },
  { uuid: '1a2b3c4d-5555-6666-7777-888899990000', name: 'Emma Wilson', email: 'emma@example.com', phone: '9999999905' },
  { uuid: '1a2b3c4d-6666-7777-8888-999900001111', name: 'Frank Harris', email: 'frank@example.com', phone: '9999999906' },
  { uuid: '1a2b3c4d-7777-8888-9999-000011112222', name: 'Grace Lee', email: 'grace@example.com', phone: '9999999907' },
  { uuid: '1a2b3c4d-8888-9999-0000-111122223333', name: 'Hannah Taylor', email: 'hannah@example.com', phone: '9999999908' },
  { uuid: '1a2b3c4d-9999-0000-1111-222233334444', name: 'Ian Martinez', email: 'ian@example.com', phone: '9999999909' },
  { uuid: '1a2b3c4d-0000-1111-2222-333344445555', name: 'Jack Thompson', email: 'jack@example.com', phone: '9999999910' },
  { uuid: '1a2b3c4d-1112-2223-3334-444555566677', name: 'Kate Adams', email: 'kate@example.com', phone: '9999999911' },
  { uuid: '1a2b3c4d-2223-3334-4445-555666677788', name: 'Leo Johnson', email: 'leo@example.com', phone: '9999999912' },
  { uuid: '1a2b3c4d-3334-4445-5556-666777788899', name: 'Mia Davis', email: 'mia@example.com', phone: '9999999913' },
  { uuid: '1a2b3c4d-4445-5556-6667-777888899900', name: 'Nathan Scott', email: 'nathan@example.com', phone: '9999999914' },
  { uuid: '1a2b3c4d-5556-6667-7778-888999900011', name: 'Olivia Brown', email: 'olivia@example.com', phone: '9999999915' },
  { uuid: '1a2b3c4d-6667-7778-8889-999000011122', name: 'Paul Clark', email: 'paul@example.com', phone: '9999999916' },
  { uuid: '1a2b3c4d-7778-8889-9990-000111122233', name: 'Quinn Lewis', email: 'quinn@example.com', phone: '9999999917' },
  { uuid: '1a2b3c4d-8889-9990-0001-111222233344', name: 'Rachel Hall', email: 'rachel@example.com', phone: '9999999918' },
  { uuid: '1a2b3c4d-9990-0001-1112-222333344455', name: 'Sam Young', email: 'sam@example.com', phone: '9999999919' },
  { uuid: '1a2b3c4d-0001-1112-2223-333444455566', name: 'Tina King', email: 'tina@example.com', phone: '9999999920' },
  { uuid: '1a2b3c4d-1112-2223-3334-444555566677', name: 'Uma Nelson', email: 'uma@example.com', phone: '9999999921' },
  { uuid: '1a2b3c4d-2223-3334-4445-555666677788', name: 'Victor Carter', email: 'victor@example.com', phone: '9999999922' },
  { uuid: '1a2b3c4d-3334-4445-5556-666777788899', name: 'Wendy Green', email: 'wendy@example.com', phone: '9999999923' },
  { uuid: '1a2b3c4d-4445-5556-6667-777888899900', name: 'Xavier Moore', email: 'xavier@example.com', phone: '9999999924' },
  { uuid: '1a2b3c4d-5556-6667-7778-888999900011', name: 'Yara Perry', email: 'yara@example.com', phone: '9999999925' },
  { uuid: '1a2b3c4d-6667-7778-8889-999000011122', name: 'Zane Foster', email: 'zane@example.com', phone: '9999999926' },
  { uuid: '1a2b3c4d-7778-8889-9990-000111122233', name: 'Amanda Baker', email: 'amanda@example.com', phone: '9999999927' },
  { uuid: '1a2b3c4d-8889-9990-0001-111222233344', name: 'Brian Reed', email: 'brian@example.com', phone: '9999999928' },
  { uuid: '1a2b3c4d-9990-0001-1112-222333344455', name: 'Carla Wright', email: 'carla@example.com', phone: '9999999929' },
  { uuid: '1a2b3c4d-0001-1112-2223-333444455566', name: 'Derek Bell', email: 'derek@example.com', phone: '9999999930' },
  { uuid: '1a2b3c4d-1112-2223-3334-444555566677', name: 'Eve Stewart', email: 'eve@example.com', phone: '9999999931' },
  { uuid: '1a2b3c4d-2223-3334-4445-555666677788', name: 'Felix Murphy', email: 'felix@example.com', phone: '9999999932' },
  { uuid: '1a2b3c4d-3334-4445-5556-666777788899', name: 'Gina Coleman', email: 'gina@example.com', phone: '9999999933' },
  { uuid: '1a2b3c4d-4445-5556-6667-777888899900', name: 'Henry Patterson', email: 'henry@example.com', phone: '9999999934' },
  { uuid: '1a2b3c4d-5556-6667-7778-888999900011', name: 'Isabel Barnes', email: 'isabel@example.com', phone: '9999999935' }
]
</script>

<style lang="scss">
.with-virtual-scroll {
  $root: &;

  .q-table__middle {
    max-height: 200px;
    overflow-y: auto !important;
  }
}
</style>
