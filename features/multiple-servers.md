---
layout: feature
title: Multiple servers
prev_slug: dedicated-thread-pool
prev_text: Dedicated Thread Pool
next_slug: host-agnostic-server
next_text: Host-agnostic server
---

HangFire может работать одновременно с несколькими серверами. Это означает, что поддерживаются как конфигурации WebGarden, так и WebFarm. У каждого сервера есть свой уникальный идентификатор, который включает в себя ID процесса и `Environment.MachineName`.

Посмотреть список активных серверов можно через веб-интерфейс:

![Image](asf)

Каждый сервер через определенные промежутки времени обновляет heartbeat в хранилище. Если сервер долго не обновлял это значение, то он автоматически удаляется из списка активных серверов.