<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DropSessionsIndex extends Command
{
    protected $signature = 'db:drop-sessions-index';
    protected $description = 'Drop MongoDB sessions.id_1 index if it exists';

    public function handle()
    {
        $collection = DB::connection('mongodb')->getMongoDB()->sessions;
        $indexes = $collection->listIndexes();
        foreach ($indexes as $index) {
            if ($index->getName() === 'id_1') {
                $this->info("Dropping index id_1...");
                $collection->dropIndex('id_1');
            }
        }
        $this->info("Done.");
    }
}
